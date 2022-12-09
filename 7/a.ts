import * as fs from "fs";

let input = fs.readFileSync("input.txt", "utf8");

let formattedInput = input.replaceAll("\r", "").split("\n")

let directorySet = new Set()
let fileMap = new Map()

const parseDirectiory = (directoryString: string) => { return directoryString.includes("$ cd ") ? directoryString.split("cd ")[1] : directoryString.split("dir ")[1] }


const recurse = (runningTotal: number, next: string[], previous: string, map: Map<string, string[]>, clonedMap: Map<string, string[]>, done: boolean) => {
    //stop if there are no more elements in the current working dir, and the previous folder is the same as the current folder

    console.log(runningTotal, "\nnext:", next, "\nprevious:", previous, "\nmap:", map)

    if (!done && next) {

        let nextFile = next[0]
        if (nextFile === undefined) {
            done = true
            return runningTotal
        }

        if (nextFile?.includes("dir") && !done) {
            const goToDirectory = parseDirectiory(nextFile)

            if (map.has(goToDirectory)) {
                let next = map.get(goToDirectory)
                map.forEach((value, key) => {
                    if (value.includes(nextFile)) {
                        value.shift()
                        if (value.length === 0) {
                            if (key === previous) {
                                done = true
                                console.log('check')
                            }
                            map.delete(key)
                            previous = key
                        }
                    }
                })
                return recurse(runningTotal, next, previous, map, clonedMap, done)

            }
        }

        if (!nextFile?.includes("dir") && !done) {
            runningTotal += +nextFile.split(" ")[0]
        }

        let previousFolder: string

        map.forEach((value, key) => {
            if (value.includes(nextFile)) {
                value.shift()
                next = value
                if (value.length === 0) {
                    previousFolder = key
                    if (key === previous) {
                        done = true
                        console.log('check')
                        map.delete(key)

                    }
                }
            }
        })


        if (previousFolder) {
            let returnToKey: string

            clonedMap.forEach((value, key) => {
                if (value.includes(`dir ${previousFolder}`)) {
                    value.shift()
                    returnToKey = key
                }
            })

            // if (!map.has(previous) && map.get(returnToKey)?.length === 0) {
            //     done = true
            // }
            return recurse(runningTotal, map.get(returnToKey), previousFolder, map, clonedMap, done)
        }

        if (next === undefined || next.length === 0) {
            done = true
        }

        return recurse(runningTotal, next, previous, map, clonedMap, done)

    }
    return runningTotal

}





const solutionA = (formattedInput: string[]) => {
    formattedInput.map((line) => {
        if (line.includes("dir")) {
            directorySet.add(parseDirectiory(line))
        }
        if (line.includes("cd ") && line !== "$ cd ..") {
            directorySet.add(parseDirectiory(line))
        }
    })

    directorySet.forEach((directory) => {
        let iterateTree = false
        let currentPath = []

        for (let idx = 0; idx < formattedInput.length; idx++) {
            const line = formattedInput[idx];

            if (line === `$ cd ${directory}` && !iterateTree) {
                iterateTree = true
                continue
            }

            if (iterateTree) {
                if (line.includes("$ cd")) {
                    fileMap.set(directory, currentPath)
                    iterateTree = false
                } else if (!line.includes("$ ls")) {
                    currentPath.push(line)
                }
            }
        }
        fileMap.set(directory, currentPath)
    })

    console.log(fileMap, "\n\n\n")
    const a = recurse(0, structuredClone(fileMap).get("d"), "d", structuredClone(fileMap), structuredClone(fileMap), false)
    console.log("answer", a)


    let fullTotal = 0
    fileMap.forEach((x, key, map) => {
        let total = recurse(0, structuredClone(map).get(key), key, structuredClone(map), structuredClone(map), false)
        if (total < 100000) {
            fullTotal += total
        }

    })

    console.log(fullTotal)
}

solutionA(formattedInput);

