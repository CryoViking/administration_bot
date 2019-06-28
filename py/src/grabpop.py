###############################################################################
# graphgen.py
# Grabs the population from 
###############################################################################

import argparse
import requests
import json
import time
from datetime import datetime

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
    p.add_argument("-o", "--outfile", type=str, dest="outf", default=None, 
            help="the CSV file to output to, will append a new line")
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


def write_csv(args, val):
    """
    Append the new value to the CSV. 
    """
    if args.outf is not None:
        currtime = datetime.now()
        timestr = currtime.strftime("%d:%m:%Y")
        with open(args.outf, "a") as f:
            f.write("%s,%s\n" %(timestr, val))


if __name__ == "__main__":
    """
    Entry point. 
    """
    args = get_args().parse_args()
    conf = get_conf_json(args.conf)
    write_csv(args, 36)
    write_csv(args, 36)
    write_csv(args, 36)
    write_csv(args, 36)

    # TODO need this in a loop with interval
    greq = requests.get(url=GUILD_MEMBER_URL.format(conf["guild_id"]))
    gjson = greq.json()
    mem_count = 0
    if greq.status_code == 200:
        mem_count = len(gjson)
        write_csv(args, mem_count)
    print(greq)

    interval = args.intv       # interval in seconds, default 3600
    if interval < 60:
        interval = 60

