###############################################################################
# graphgen.py
# Grabs the population from 
###############################################################################

import argparse
import requests
import json
import time

# use .format() on me
API_BASE_URL = "https://discordapp.com/api{}"
USER_GUILD_URL = API_BASE_URL.format("/users/@me/guilds")
GUILD_MEMBER_URL = API_BASE_URL.format("/guilds/{}/members")

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
    print("pop stuff")
    args = get_args().parse_args()
    conf = get_conf_json(args.conf)

    # TODO need this in a loop with interval
    greq = requests.get(url=GUILD_MEMBER_URL.format(conf["guild_id"]))
    gjson = greq.json()
    mem_count = 0
    if greq.status_code == 200:
        mem_count = len(gjson)
    print(mem_count)

    interval = args.intv       # interval in seconds, default 3600
    if interval < 60:
        interval = 60

