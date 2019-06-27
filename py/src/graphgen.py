###############################################################################
# graphgen.py
# Generates a graph, saving the output to a PNG file. 
###############################################################################

import argparse
import csv
import matplotlib
import matplotlib.pyplot as plt
from matplotlib.dates import DateFormatter
from datetime import datetime

def get_args():
    """
    Returns the args from user. 
    """
    p = argparse.ArgumentParser(description="Graph generator.")
    p.add_argument("input", type=str, 
            help="the input CSV file")
    p.add_argument("-o", "--out", type=str, dest="file", default="graph.png", 
            help="the file name of the graph, default to graph.png")
    p.add_argument("-yl", "--y-label", type=str, dest="yl", default="Val", 
            help="the Y axis label")
    p.add_argument("-v", "--verbose", action="store_true", dest="verb", 
            help="produce verbose output")
    return p


def read_csv(fname):
    """
    Reads the CSV and returns X (as dates) and Y (as nums). 
    """
    x = []
    y = []
    with open(fname) as f:
        csvr = csv.reader(f, delimiter=",")
        for row in csvr:
            if (len(row) >= 2):
                x.append(datetime.strptime(row[0], "%d:%m:%Y"))
                y.append(float(row[1]))
    return x, y


if __name__ == "__main__":
    """
    Entry point. 
    """
    argp = get_args().parse_args()
    x, y = read_csv(argp.input)
    first = "{0:%d/%m/%Y}".format(x[0])
    last = "{0:%d/%m/%Y}".format(x[-1])
    xdates = matplotlib.dates.date2num(x)

    # generate graph
    fig, ax = plt.subplots()
    ax.xaxis.set_major_formatter(DateFormatter("%d/%m/%Y"))
    ax.xaxis.set_tick_params(rotation=30, labelsize=10)
    ax.set(xlabel="Date (%s TO %s)" %(first, last), ylabel=argp.yl)

    plt.plot(xdates, y)
    plt.tight_layout()
    plt.savefig(argp.file)
    if argp.verb:
        print("X: %s" %x)
        print("Y: %s" %y)
    exit(0)

