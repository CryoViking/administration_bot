###############################################################################
# graphgen.py
# Grabs the population from 
###############################################################################

import argparse
import requests
import json
import time

def get_args():
    """
    Get user arguments. 
    """
    p = argparse.ArgumentParser(description="Bot population grabber.")
    p.add_argument("conf", type=str, dest="conf", 
            help="the BOT config file path (json file)")
    p.add_argument("-i", "--interval", type=int, dest="intv", default=3600, 
            help="the interval in seconds, defaults to 3600")
    return p

if __name__ == "__main__":
    """
    Entry point. 
    """
    args = get_args().parse_args()
    interval = args.intv       # interval in seconds, default 3600

    while True:
        
        time.sleep(interval)
    print(interval)

