#!/usr/bin/python

import json
import os
import sys

def main():
    # Check that the JSON file exists:
    json_path = "package.json"
    if not os.path.exists(json_path):
        print("The JSON file \"%s\" doesn't exist." % json_path)
        sys.exit(1)

    # Parse the JSON file:
    try:
        with open(json_path) as json_file:
            json_object = json.load(json_file)
    except ValueError:
        print("Can't parse JSON file \"%s\"." % json_path)
        sys.exit(1)

    # Check that the JSON file contains the "version" key:
    version = json_object.get("version")
    if version is None:
        print("Can't find \"version\" inside JSON file \"%s\"." % json_path)
        sys.exit(1)

    # Output the value of the version:
    print(version)

    # Done
    sys.exit(0)

if __name__ == "__main__":
    main()
