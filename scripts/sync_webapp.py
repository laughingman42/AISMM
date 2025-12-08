#!/usr/bin/env python3
import os
import shutil
import sys

# Define paths relative to the script location
SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))
ROOT_DIR = os.path.dirname(SCRIPT_DIR)
SOURCE_YAML = os.path.join(ROOT_DIR, "aismm_definition", "aismm.yaml")
DEST_DIR = os.path.join(ROOT_DIR, "webapp", "public")
DEST_YAML = os.path.join(DEST_DIR, "aismm.yaml")

def sync_yaml():
    # Check if source exists
    if not os.path.exists(SOURCE_YAML):
        print(f"Error: Source file not found at {SOURCE_YAML}")
        sys.exit(1)

    # Create destination directory if it doesn't exist
    if not os.path.exists(DEST_DIR):
        try:
            os.makedirs(DEST_DIR)
            print(f"Created directory: {DEST_DIR}")
        except OSError as e:
            print(f"Error creating directory {DEST_DIR}: {e}")
            sys.exit(1)

    # Copy the file
    try:
        shutil.copy2(SOURCE_YAML, DEST_YAML)
        print(f"Successfully copied aismm.yaml to {DEST_YAML}")
    except Exception as e:
        print(f"Error copying file: {e}")
        sys.exit(1)

if __name__ == "__main__":
    print("Syncing AISMM YAML to webapp...")
    sync_yaml()
