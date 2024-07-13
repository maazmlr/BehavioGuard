// // Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::process::Command;
// use std::path::PathBuf;

// #[tauri::command]
// fn start_data_collection() {
//     let script_path = PathBuf::from("..").join("backend").join("main.py");

//     // Run the Python script using an external command
//     Command::new("python")
//         .arg(script_path)
//         .spawn()
//         .expect("failed to execute Python script");
// }

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet, start_data_collection])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }


// Prevents additional console window on Windows in release, DO NOT REMOVE!!
// #![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

// use std::process::Command;
// use std::path::PathBuf;

// #[tauri::command]
// fn start_data_collection(uid: String) {
//     let script_path = PathBuf::from("..").join("backend").join("main.py");

//     // Run the Python script using an external command and pass the UID
//     Command::new("python")
//         .arg(script_path)
//         .arg(uid) // Pass the UID to the script
//         .spawn()
//         .expect("failed to execute Python script");
// }

// // Learn more about Tauri commands at https://tauri.app/v1/guides/features/command
// #[tauri::command]
// fn greet(name: &str) -> String {
//     format!("Hello, {}! You've been greeted from Rust!", name)
// }

// fn main() {
//     tauri::Builder::default()
//         .invoke_handler(tauri::generate_handler![greet, start_data_collection])
//         .run(tauri::generate_context!())
//         .expect("error while running tauri application");
// }


// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::process::{Command, Child};
use std::path::PathBuf;
use std::sync::{Arc, Mutex};

struct AppState {
    data_collection_process: Option<Child>,
}

#[tauri::command]
fn start_data_collection(state: tauri::State<Arc<Mutex<AppState>>>, uid: String) {
    let script_path = PathBuf::from("..").join("backend").join("main.py");

    let mut state = state.lock().unwrap();
    
    if state.data_collection_process.is_some() {
        eprintln!("Data collection is already running.");
        return;
    }

    let child = Command::new("python")
        .arg(script_path)
        .arg(uid)
        .spawn()
        .expect("failed to execute Python script");

    state.data_collection_process = Some(child);
}

#[tauri::command]
fn stop_data_collection(state: tauri::State<Arc<Mutex<AppState>>>) {
    let mut state = state.lock().unwrap();

    if let Some(mut child) = state.data_collection_process.take() {
        if let Err(e) = child.kill() {
            eprintln!("Failed to kill process: {}", e);
        }
    } else {
        eprintln!("No data collection process is running.");
    }
}

fn main() {
    let state = Arc::new(Mutex::new(AppState {
        data_collection_process: None,
    }));

    tauri::Builder::default()
        .manage(state)
        .invoke_handler(tauri::generate_handler![start_data_collection, stop_data_collection])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
