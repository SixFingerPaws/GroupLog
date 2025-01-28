function createAggregatedDebounceFn(fn, timeout = 300, groupName = null) {
    let timer;
    const calls = [];
    return (...args) => {
        calls.push(args);
        clearTimeout(timer);
        timer = setTimeout(() => {
            if (groupName !== null)
                console.groupCollapsed(groupName);
            calls.forEach(call => fn.apply(fn, call));
            if (groupName !== null)
                console.groupEnd();
        }, timeout);
    };
}
export function groupLog(groupName, timeout = 300) {
    return createAggregatedDebounceFn(console.log, timeout, groupName);
}
