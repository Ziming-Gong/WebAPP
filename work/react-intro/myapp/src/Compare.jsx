
function Compare(words){
    // if(words.guess.lenth > 5 || words.guess.lenth < 5){
    //     return (
    //         <p>{words.guess} was not a valid word</p>
    //     )
    // }
    
    let matches = 0;
    const letterCount = {};

    for (let letter of words.word.toLowerCase()){
        letterCount[letter] = letterCount+1 ||1;
    }
    
    for(let letter of words.guess.toLowerCase()){
        if( letterCount[letter]){
            letterCount[letter] -=1;
            matches += 1;
        }
    }

    if(words.guess === words.word){
        return <p>{words.guess} is the secret word!</p>
    }
    return (
        <p> {words.guess} had {matches} letters in common</p>
    )
    // if(matches != words.word.lenth){
    //     return (
    //         <p> {words.guess} had {matches} letters in common</p>
    //     )
    // }
    

}

export default Compare;