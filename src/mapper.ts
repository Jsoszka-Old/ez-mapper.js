export function map<Src, Dest>(source: any, dest: any, customMapper: (src: Src, dest: Dest) => void = (src, dest) => { }): Dest {
    const sourceKeys = Object.keys(source);

    sourceKeys.forEach(key => {
        if (key in dest) {
            if (source[key] instanceof Object) {
                console.log(`${key} is an object starting recursion`)
                dest[key] = map(source[key], dest[key])
            }
            else
                dest[key] = source[key]
        }
    })

    if (customMapper)
        customMapper(source, dest)

    return dest
}



