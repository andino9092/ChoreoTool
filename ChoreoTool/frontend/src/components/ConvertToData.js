export default function convertToData(input){
    var data = input;
    var converted = [];
    while(data.indexOf(']]') != -1){
        var res = [];
        var page = data.substring(data.indexOf('[') + 1, data.indexOf(']]')+1);
        while(page.indexOf('[') != -1){
            var left = page.indexOf('[');
            var right = page.indexOf(']');
            var pos = page.substring(left + 1, right).split(',').map(n => parseInt(n));
            page = page.substring(right+2);
            res = [...res, pos];
        }
        data = data.substring(data.indexOf(']]') + 3)
        converted = [...converted, res];
    }
    return converted;

}

