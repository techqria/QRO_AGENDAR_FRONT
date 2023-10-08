export function FormatBgColor(color: string) {
    color = color.replace(/^#/, '');

    const r = parseInt(color.slice(0, 2), 16);
    const g = parseInt(color.slice(2, 4), 16);
    const b = parseInt(color.slice(4, 6), 16);
    
    if(r > 120 && g > 120 && b > 120) return 'black'
    else return 'white'
}