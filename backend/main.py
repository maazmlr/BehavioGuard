from pynput import keyboard
import csv
import time
import numpy as np
import os
import sqlite3

# Get the absolute path to the directory containing the Python script
script_dir = os.path.dirname(os.path.abspath(__file__))

# Specify the path to the folder where the database file will be stored
database_folder = os.path.join(script_dir, 'database')

# Make sure the database folder exists, create it if it doesn't
os.makedirs(database_folder, exist_ok=True)

# Specify the name of the SQLite database file
db_file_name = 'project_database.db'

# Specify the path to the SQLite database file
db_file_path = os.path.join(database_folder, db_file_name)

# Variables to store statistics
keystroke_counter = 0
erase_counter = 0
press_and_hold_total = 0
press_and_hold_count = 0
latency_total = 0
word_counter = 0
word_length_total = 0
phrase_counter = 0
erase_counter_percentage = 0
press_and_hold_std = 0
word_std = 0
latency_std = 0

# Timestamp variables
start_time = 0
last_key_time = 0
last_key_press_time = 0

# List to store statistics
statistics = []

# List to store press and hold durations
press_and_hold_durations = []
word_counts = []
latencies = []

# Get the absolute path to the backend folder
backend_folder = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "backend"))
# Specify the path to the CSV file within the backend folder
csv_file_path = os.path.join(backend_folder, "data.csv")

# Function to handle key events
def on_press(key):
    global keystroke_counter, erase_counter, start_time, last_key_time, last_key_press_time
    global word_counter, word_length_total, phrase_counter, erase_counter_percentage

    # Update timestamp on key press
    if start_time == 0:
        start_time = time.time()

    # Update last key time and press time on each key press
    last_key_time = time.time()
    last_key_press_time = time.time()

    # Count keystrokes
    keystroke_counter += 1

    # Check if the key is an erase key (e.g., Backspace)
    if key == keyboard.Key.backspace or key == keyboard.Key.delete:
        erase_counter += 1
        erase_counter_percentage = (erase_counter * 100) / keystroke_counter

    # Calculate press and hold duration on key press
    if last_key_press_time > 0:
        press_duration = time.time() - last_key_press_time
        press_and_hold_durations.append(press_duration)

    # Exclude space and Enter keys from word count
    if key not in {keyboard.Key.space, keyboard.Key.enter}:
        word_counter += 1
        word_counts.append(word_counter)

    # Count phrases based on space and Enter keys
    if key in {keyboard.Key.space, keyboard.Key.enter}:
        phrase_counter += 1

    word_length_total = word_counter / (phrase_counter+1) if phrase_counter > 0 else 0
# Function to handle key release events
def on_release(key):
    global press_and_hold_total, press_and_hold_count, last_key_press_time

    # Calculate press and hold duration on key release
    if last_key_press_time > 0:
        press_and_hold_total += time.time() - last_key_press_time
        press_and_hold_count += 1

    # Calculate latency on key release
    if last_key_time > 0:
        latency = time.time() - last_key_time
        latencies.append(latency)

# Create listeners for key events
with keyboard.Listener(on_press=on_press, on_release=on_release) as listener:
    try:
        while True:
            # Sleep for a short interval to avoid high CPU usage
            time.sleep(0.1)

            # Check if 60 seconds have passed
            if time.time() - start_time >= 60:
                # Calculate average latency
                latency_total = time.time() - start_time
                average_latency = latency_total / keystroke_counter if keystroke_counter > 0 else 0

                # Check if press_and_hold_count is greater than zero before division
                press_and_hold_avg = press_and_hold_total / press_and_hold_count if press_and_hold_count > 0 else 0

                # Calculate the standard deviation of press_and_hold_durations
                press_and_hold_std = np.std(press_and_hold_durations) if len(press_and_hold_durations) > 0 else 0

                # Calculate the standard deviation of word counts
                word_std = np.std(word_counts) if len(word_counts) > 0 else 0

                # Calculate the standard deviation of latency
                latency_std = np.std(latencies) if len(latencies) > 0 else 0

                # Function to initialize the database
                def initialize_database():
                    conn = sqlite3.connect(db_file_path)
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

                # Function to insert data into the database
                def insert_data(statistics):
                    conn = sqlite3.connect(db_file_path)
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

                # Initialize the database
                initialize_database()

                # Store statistics in a list
                statistics.append([
                        time.time(),
                        keystroke_counter, 
                        erase_counter, 
                        erase_counter_percentage, 
                        press_and_hold_avg, 
                        press_and_hold_std, 
                        average_latency, 
                        latency_std, 
                        word_counter, 
                        word_length_total,
                        word_std,
                        phrase_counter + 1
                    ])
                
                # Optionally, print the statistics
                print(f"Statistics after 60 seconds: {statistics[-1]}")

                 # Store statistics in the SQLite database
                insert_data(statistics)

                # Clear the statistics list
                statistics.clear()

                # Reset counters and timestamp for the next 60 seconds
                keystroke_counter = 0
                erase_counter = 0
                press_and_hold_total = 0
                press_and_hold_count = 0
                latency_total = 0
                word_counter = 0
                word_length_total = 0
                phrase_counter = 0
                erase_counter_percentage = 0
                press_and_hold_std = 0
                press_and_hold_durations = []
                word_std = 0
                word_counts = []
                latencies = []
                start_time = time.time()

    except KeyboardInterrupt:
        pass