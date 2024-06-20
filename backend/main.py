import time
import math
import csv
from pynput import mouse, keyboard
import threading
import numpy as np
import os
import sqlite3

# Variables to store mouse data
clicks = 0
left_clicks = 0
right_clicks = 0
scroll_clicks = 0
scrolls_up = 0
scrolls_down = 0
positions = []
directions = []

# Variables to store keystroke data
keystroke_counter = 0
erase_counter = 0
press_and_hold_total = 0
press_and_hold_count = 0
latency_total = 0
word_counter = 0
word_length_total = 0
phrase_counter = 0
erase_counter_percentage = 0

# Lists to store individual measurements
press_and_hold_durations = []
word_lengths = []
latencies = []

# Timestamp variables
start_time = 0
last_key_time = 0
last_key_press_time = 0

# Lock for thread-safe data access
data_lock = threading.Lock()

# Shared data structure for combined data
combined_data = []

# Get the absolute path to the directory containing the Python script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Specify the path to the folder where the database files will be stored
database_folder = os.path.join(script_dir, 'database')

# Make sure the database folder exists, create it if it doesn't
os.makedirs(database_folder, exist_ok=True)

# Specify the names of the SQLite database files
keyboard_db_file_name = 'keyboard_data.db'
mouse_db_file_name = 'mouse_data.db'

# Specify the paths to the SQLite database files
keyboard_db_file_path = os.path.join(database_folder, keyboard_db_file_name)
mouse_db_file_path = os.path.join(database_folder, mouse_db_file_name)

# Mouse event listeners
def on_move(x, y):
    global positions
    positions.append((x, y))

def on_click(x, y, button, pressed):
    global clicks, left_clicks, right_clicks, scroll_clicks
    if pressed:
        clicks += 1
        if button == mouse.Button.left:
            left_clicks += 1
        elif button == mouse.Button.right:
            right_clicks += 1
        elif button == mouse.Button.middle:
            scroll_clicks += 1

def on_scroll(x, y, dx, dy):
    global scrolls_up, scrolls_down
    if dy > 0:
        scrolls_up += 1
    elif dy < 0:
        scrolls_down += 1

# Calculate speed and acceleration
def calculate_speed_and_acceleration(positions):
    speeds = []
    for i in range(1, len(positions)):
        x1, y1 = positions[i - 1]
        x2, y2 = positions[i]
        distance = math.sqrt((x2 - x1)**2 + (y2 - y1)**2)
        speeds.append(distance)
    if len(speeds) < 2:
        return 0, 0  # Not enough data to calculate
    avg_speed = sum(speeds) / len(speeds)
    accelerations = [speeds[i] - speeds[i - 1] for i in range(1, len(speeds))]
    avg_acceleration = sum(accelerations) / len(accelerations)
    return avg_speed, avg_acceleration

# Calculate directions
def calculate_directions(positions):
    global directions
    for i in range(1, len(positions)):
        x1, y1 = positions[i - 1]
        x2, y2 = positions[i]
        angle = math.atan2(y2 - y1, x2 - x1)
        directions.append(math.degrees(angle))

# Keyboard event listeners
def on_press(key):
    global keystroke_counter, erase_counter, start_time, last_key_time, last_key_press_time
    global word_counter, word_length_total, phrase_counter, erase_counter_percentage

    if start_time == 0:
        start_time = time.time()

    last_key_time = time.time()
    last_key_press_time = time.time()
    keystroke_counter += 1

    # Check if the key is an erase key (e.g., Backspace)
    erase_keys = {'backspace', 'delete'}
    if key == keyboard.Key.backspace or key == keyboard.Key.delete:
        erase_counter += 1
        erase_counter_percentage = (erase_counter * 100) / keystroke_counter

    # Exclude space and Enter keys from word count
    if key not in {keyboard.Key.space, keyboard.Key.enter}:
        word_counter += 1
        word_length_total += 1
        word_lengths.append(1)

    # Count phrases based on space and Enter keys
    if key in {keyboard.Key.space, keyboard.Key.enter}:
        phrase_counter += 1

def on_release(key):
    global press_and_hold_total, press_and_hold_count, last_key_press_time

    # Calculate press and hold duration on key release
    if last_key_press_time > 0:
        press_duration = time.time() - last_key_press_time
        press_and_hold_total += press_duration
        press_and_hold_count += 1
        press_and_hold_durations.append(press_duration)

    # Calculate latency on key release
    if last_key_time > 0:
        latency = time.time() - last_key_time
        latencies.append(latency)

# Function to initialize the keyboard database
def initialize_keyboard_database():
    conn = sqlite3.connect(keyboard_db_file_path)
    cursor = conn.cursor()

    # Create the table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS keyboard_statistics (
            id INTEGER PRIMARY KEY,
            timestamp INTEGER,
            keystrokes INTEGER,
            erase_keys INTEGER,
            erase_keys_percentage REAL,
            press_and_hold_avg REAL,
            press_and_hold_std REAL,
            average_latency REAL,
            latency_std REAL,
            word_counter INTEGER,
            word_avg_length REAL,
            word_std_length REAL,
            phrase_counter INTEGER
        )
    ''')

    conn.commit()
    conn.close()

# Function to insert keyboard data into the database
def insert_keyboard_data(statistics):
    conn = sqlite3.connect(keyboard_db_file_path)
    cursor = conn.cursor()

    for stat in statistics:
        cursor.execute('''
            INSERT INTO keyboard_statistics (
                timestamp, keystrokes, erase_keys, erase_keys_percentage,
                press_and_hold_avg, press_and_hold_std, average_latency,
                latency_std, word_counter, word_avg_length, word_std_length,
                phrase_counter
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', stat)

    conn.commit()
    conn.close()

# Function to initialize the mouse database
def initialize_mouse_database():
    conn = sqlite3.connect(mouse_db_file_path)
    cursor = conn.cursor()

    # Create the table if it doesn't exist
    cursor.execute('''
        CREATE TABLE IF NOT EXISTS mouse_statistics (
            id INTEGER PRIMARY KEY,
            timestamp INTEGER,
            clicks INTEGER,
            left_clicks INTEGER,
            right_clicks INTEGER,
            scroll_clicks INTEGER,
            scrolls_up INTEGER,
            scrolls_down INTEGER,
            avg_speed REAL,
            avg_acceleration REAL,
            directions TEXT
        )
    ''')

    conn.commit()
    conn.close()

# Function to insert mouse data into the database
def insert_mouse_data(statistics):
    conn = sqlite3.connect(mouse_db_file_path)
    cursor = conn.cursor()

    for stat in statistics:
        cursor.execute('''
            INSERT INTO mouse_statistics (
                timestamp, clicks, left_clicks, right_clicks, scroll_clicks,
                scrolls_up, scrolls_down, avg_speed, avg_acceleration, directions
            ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
        ''', stat)

    conn.commit()
    conn.close()

# Main function to gather data every minute
def main():
    global clicks, left_clicks, right_clicks, scroll_clicks, scrolls_up, scrolls_down, positions, directions
    global keystroke_counter, erase_counter, press_and_hold_total, press_and_hold_count, latency_total, word_counter, word_length_total, phrase_counter, erase_counter_percentage
    global start_time, press_and_hold_durations, word_lengths, latencies

    # Initialize the databases
    initialize_keyboard_database()
    initialize_mouse_database()

    # Set up the mouse listener
    mouse_listener = mouse.Listener(on_move=on_move, on_click=on_click, on_scroll=on_scroll)
    mouse_listener.start()

    # Set up the keyboard listener
    keyboard_listener = keyboard.Listener(on_press=on_press, on_release=on_release)
    keyboard_listener.start()

    try:
        while True:
            # Reset data every minute
            time.sleep(60)
            avg_speed, avg_acceleration = calculate_speed_and_acceleration(positions)
            calculate_directions(positions)
            timestamp = time.time()

            mouse_data = [timestamp, clicks, left_clicks, right_clicks, scroll_clicks, scrolls_up, scrolls_down, avg_speed, avg_acceleration, str(directions)]

            # Calculate average and stddev for latency and word length
            average_latency = sum(latencies) / len(latencies) if latencies else 0
            latency_std = np.std(latencies) if latencies else 0
            word_avg_length = sum(word_lengths) / len(word_lengths) if word_lengths else 0
            word_std = np.std(word_lengths) if word_lengths else 0
            press_and_hold_avg = sum(press_and_hold_durations) / len(press_and_hold_durations) if press_and_hold_durations else 0
            press_and_hold_std = np.std(press_and_hold_durations) if press_and_hold_durations else 0

            keyboard_data = [timestamp, keystroke_counter, erase_counter, erase_counter_percentage, press_and_hold_avg, press_and_hold_std, average_latency, latency_std, word_counter, word_avg_length, word_std, phrase_counter + 1]

            with data_lock:
                insert_mouse_data([mouse_data])
                insert_keyboard_data([keyboard_data])

            # Optionally, print the statistics
            print(f"Keyboard Statistics after 60 seconds: {keyboard_data}")
            print(f"Mouse Statistics after 60 seconds: {mouse_data}")

            # Reset variables for the next minute
            clicks = 0
            left_clicks = 0
            right_clicks = 0
            scroll_clicks = 0
            scrolls_up = 0
            scrolls_down = 0
            positions = []
            directions = []
            keystroke_counter = 0
            erase_counter = 0
            press_and_hold_total = 0
            press_and_hold_count = 0
            latency_total = 0
            word_counter = 0
            word_length_total = 0
            phrase_counter = 0
            erase_counter_percentage = 0
            press_and_hold_durations = []
            word_lengths = []
            latencies = []
            start_time = time.time()

    except KeyboardInterrupt:
        # Stop the listeners when interrupted
        mouse_listener.stop()
        keyboard_listener.stop()

if __name__ == "__main__":
    main()
