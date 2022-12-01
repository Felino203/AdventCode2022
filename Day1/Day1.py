def readInput():
    with open("./Day 1/input.txt", "r") as f:
        numberList = [line.split("\n")[0] for line in f]
        elfList = []
        sum = 0
        for number in numberList:
            if(number == ''):
                elfList.append(sum)
                sum = 0
                continue
            sum += int(number)
        return elfList           

def main():
    elfList = sorted(readInput(), reverse=True)
    print(elfList[0] + elfList[1]+ elfList[2])


if __name__ == "__main__":
    main()

    