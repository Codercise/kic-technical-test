type MyComponentProps = {
    data: Array<Item>
}
interface Item {
    id: number,
    name: string
}

export {
    Item,
    MyComponentProps
}