function createAggregatedDebounceFn(fn: (...args: any[]) => void, timeout = 300, groupName: string|null = null) {
    let timer: number;
    const calls: Array<any[]> = []

    return (...args: any[]) => {
        calls.push(args)
        clearTimeout(timer)

        timer = setTimeout(() => {
            if (groupName !== null) console.groupCollapsed(groupName)

            calls.forEach(call => fn.apply(fn, call))
            if (groupName !== null) console.groupEnd()
        }, timeout) as unknown as number;
    }
}
export function groupLog(groupName: string, timeout = 300) {
    return createAggregatedDebounceFn(console.log, timeout, groupName)
}
