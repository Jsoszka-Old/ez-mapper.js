



interface GlobalOptions {
    sourceTransform?: (src: string) => string
    destTransform?: (src: string) => string
}

let globalOptions: GlobalOptions

export function init(options: GlobalOptions) {
    globalOptions = options;
}


interface mapOptions<Src, Dest> {
    customMapper?: (src: Src, dest: Dest) => void
}


export function map<Src, Dest>(source: any, dest: any, options?: mapOptions<Src, Dest>): Dest {
    let sourceKeys = Object.keys(source);



    sourceKeys.forEach(srcKey => {
        let dstKey = srcKey

        if (globalOptions?.sourceTransform)
            dstKey = globalOptions.sourceTransform(srcKey)

        if (dstKey in dest) {
            if (source[srcKey] instanceof Object) {
                console.log(`${srcKey} is an object starting recursion`)
                dest[dstKey] = map(source[srcKey], dest[dstKey])
            }
            else
                dest[dstKey] = source[srcKey]
        }
    })

    if (options?.customMapper)
        options.customMapper(source, dest)

    return dest
}



