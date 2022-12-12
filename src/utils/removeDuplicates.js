export const removeDuplicates = (data) => {
    const names = [];
    const result = [];
    const reversed = data.reverse();

    reversed.forEach(item => {
        if (!names.includes(item.jmeno)) { result.push(item); } 
        names.push(item.jmeno);
    })

    return result.reverse();
}