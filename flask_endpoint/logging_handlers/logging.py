import os
from datetime import datetime

def write_transcript_to_file(transcript):
    timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    log_message = f"{timestamp} : {transcript}\n"

    with open("transcript.txt", "a") as file:
        file.write(log_message)

def write_messages_to_file(message):
    try:
       
        timestamp = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        log_message = f"{timestamp} : {message}\n"

        system_folder_path = "logs"
        if not os.path.exists(system_folder_path):
            os.makedirs(system_folder_path)

        # Use the current date as the filename
        date_str = datetime.now().strftime("%Y-%m-%d")
        file_path = os.path.join(system_folder_path, f"{date_str}.txt")

        with open(file_path, "a") as file:
            file.write(log_message)
    except Exception as e:
        return