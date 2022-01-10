interface GlobalOptions {
    transform?: (src: string) => string
}

let globalOptions: GlobalOptions = {
    transform: defaultTransformer
}

export function defaultTransformer(src: string): string {
    let transformed = src
    transformed = transformed.replace("_", "").toLowerCase()
    return transformed;
}

export function init(options: GlobalOptions) {
    globalOptions = options;
}

export function map<Source, Dest>(source: Source, dest: Dest, customMapper?: (src: Source, dest: Dest) => void): typeof dest {
    //build a map of transformedProperty => property
    let destPropMap = {}
    let sourcePropMap = {}

    Object.keys(dest).forEach(prop => {
        destPropMap[globalOptions.transform(prop)] = prop
    })

    Object.keys(source).forEach(prop => {
        sourcePropMap[globalOptions.transform(prop)] = prop
    })


    //iterate over transformed destination properties looking for matching transformed source properties
    Object.keys(destPropMap).forEach(destPropT => {
        if (sourcePropMap[destPropT]) {
            const destProp = destPropMap[destPropT]
            const srcProp = sourcePropMap[destPropT]

            //if prop is an object map recursively
            if (source[srcProp] instanceof Object && dest[destProp] instanceof Object)
                dest[destProp] = map(source[srcProp], dest[destProp])
            //else just map the value
            else
                dest[destProp] = source[srcProp]
        }
    })

    if (customMapper) {
        customMapper(source, dest)
    }

    return dest
}


