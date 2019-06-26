###############################################################################
# graphgen.py
# Generates a graph, saving the output to a PNG file. 
###############################################################################

import argparse
import matplotlib.pyplot as plt

def get_args():
    """
    Returns the args from user. 
    """
    p = argparse.ArgumentParser(description="Graph generator.")
    p.add_argument("input", type=str, 
            help="list of X values, separated by commas")
    p.add_argument("-ys", "--y-start", type=float, dest="ys", default=0.0, 
            help="starting value of Y axis, default to 0")
    p.add_argument("-yi", "--y-increment", type=float, dest="yi", default=1.0, 
            help="amount to increment Y by, default to 1")
    p.add_argument("-f", "--file", type=str, dest="file", default="graph.png", 
            help="the file name of the graph, default to graph.png")
    p.add_argument("-v", "--verbose", action="store_true", dest="verb", 
            help="produce verbose output")
    return p


def graph(xnums, ynums, fname):
    """
    Graph the X and Y values and save to a file. 
    """
    plt.plot(xnums, ynums)
    plt.savefig(fname)


if __name__ == "__main__":
    """
    Entry point. 
    """
    argp = get_args().parse_args()
    xnums = [float(n) for n in argp.input.split(",")]
    ynums = []
    ystart = argp.ys
    yinc = argp.yi
    for i in range(len(xnums)):
        ynums.append(ystart)
        ystart += yinc
    graph(xnums, ynums, argp.file)

    if argp.verb:
        print("X: %s" %xnums)
        print("Y: %s" %ynums)
    exit(0)

