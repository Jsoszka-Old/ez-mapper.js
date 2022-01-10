interface GlobalOptions {
    transform?: (src: string) => string
}

let globalOptions: GlobalOptions = {
    transform: defaultTransformer
}

export function init(options: GlobalOptions) {
    globalOptions = options;
}


interface mapOptions<Src, Dest> {
    customMapper?: (src: Src, dest: Dest) => void
}


export function map<Source, Dest>(source: Source, dest: Dest, options?: mapOptions<Source, Dest>): typeof dest {

    //original destination and source props
    let destProps = Object.keys(dest)
    let sourceProps = Object.keys(source)

    //transformed destination and source props
    let destPropsT = destProps.map(x => globalOptions.transform(x))
    let sourcePropsT = sourceProps.map(x => globalOptions.transform(x))

    //Creating maps to hold relation of transformedProperty => originalProperty
    let destPropMap = new Map();
    let sourcePropMap = new Map();

    for (let i = 0; i < destProps.length; i++) {
        destPropMap.set(destPropsT[i], destProps[i])
    }

    for (let i = 0; i < sourceProps.length; i++) {
        sourcePropMap.set(sourcePropsT[i], sourceProps[i])
    }


    //find matches and set destination values
    destPropsT.forEach(destPropT => {
        if (sourcePropMap.has(destPropT)) {
            const destProp = destPropMap.get(destPropT)
            const srcProp = sourcePropMap.get(destPropT)

            if (source[srcProp] instanceof Object && dest[destProp] instanceof Object)
                dest[destProp] = map(source[srcProp], dest[destProp])
            else
                dest[destProp] = source[srcProp]
        }
    })

    if (options?.customMapper) {
        options.customMapper(source, dest)
    }

    return dest
}


export function defaultTransformer(src: string): string {

    let transformed = src
    transformed = transformed.replace("_", "").toLowerCase()
    return transformed;

}