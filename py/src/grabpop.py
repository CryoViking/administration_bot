###############################################################################
# graphgen.py
# Grabs the population from 
###############################################################################

import argparse
import requests
import json
import time

# use .format() on me
APIBASE = "https://discordapp.com/api/{}"

def get_args():
    """
    Get user arguments. 
    """
    p = argparse.ArgumentParser(description="Bot population grabber.")
    p.add_argument("conf", type=str, 
            help="the BOT config file path (json file)")
    p.add_argument("-i", "--interval", type=int, dest="intv", default=3600, 
            help="the interval in seconds, defaults to 3600")
    return p


def get_json(raw):
    """
    Returns the JSON from raw. 
    """
    return json.loads(raw)


def get_conf_json(conf):
    """
    Returns the config file as JSON. 
    """
    with open(conf) as f:
        return json.loads(f.read())


if __name__ == "__main__":
    """
    Entry point. 
    """
    args = get_args().parse_args()
    interval = args.intv       # interval in seconds, default 3600
    # TODO make checks on interval (60 sec min)
    conf = get_conf_json(args.conf)
    botid = conf["id"]
    guid = conf["guild_id"]

