
export class keyWordsClass{

  static getAllCombinations(keyword: string): Array<string>{
    let result : Array<string> = [];

    let loop = function (start:number,depth: number,prefix:string)
    {
        for (let i = start; i < keyword.length; i++)
        {
            let next = prefix + keyword[i];
            if (depth > 0)
              loop(i+1,depth-1,next);
            else
              result.push(next);
        }
    }
    for ( let i = 0; i < keyword.length; i++)
    {
        loop(0, i, '');
    }

    return result;
  }

}
