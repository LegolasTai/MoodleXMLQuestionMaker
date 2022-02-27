const questionSeperator = String.fromCharCode(10,9,9,10);
const answerSeperator = String.fromCharCode(10);


const tab = String.fromCharCode(9);
const lineFeed = String.fromCharCode(10);
const carriageReturn = String.fromCharCode(13);

const tribleLineFeed = lineFeed+lineFeed+lineFeed;
const doubleLineFeed = lineFeed + lineFeed;

function getSerializedObj(data,qId)
{
    data = getSerializedString(data);
    
    return getQuestionSetObject(data, qId);
}

function getSerializedString(data)
{
    data = getNoneExpectCharData(data);
    data = getTabRemoved(data);
    data = getCarriageReturnRemoved(data);

    data = getTribleLinefeedRemoved(data);

    data = getDoubleLineFeedWithARemoved(data);

    return getHeaderRemoved(data);
}


function getNoneExpectCharData(data)
{
    const expectChar = String.fromCharCode(65533);
    return  data.toString().replaceAll(expectChar,`'`);
}

function getTabRemoved(data)
{
    return  data.toString().replaceAll(tab,'');
}

function getCarriageReturnRemoved(data)
{
    return  data.toString().replaceAll(carriageReturn,'');
}

function getTribleLinefeedRemoved(data)
{
    while(data.indexOf(tribleLineFeed)>0)
    {
        data = data.replaceAll(tribleLineFeed,doubleLineFeed);
    }

    return data;
}

function getDoubleLineFeedWithARemoved(data)
{
    const doubleLineFeedWithA = doubleLineFeed+`A`;
    
    while(data.indexOf(doubleLineFeedWithA)>0)
    {
        data = data.replaceAll(doubleLineFeedWithA,lineFeed+`A`);
    }

    return data;
}

function getHeaderRemoved(data)
{
    let count = 0;
    while(isNaN (parseInt (data.charAt (0) ) ) && count < 10)
    {
        data = data.substring(data.indexOf(lineFeed)+1, data.length);
    }
    return data;
}

function getQuestionSetObject(data, qId)
{
    
    let result = { arrQuestionSet:[] };

    let arrQuestionSet =  data.toString().split(doubleLineFeed);
    
    arrQuestionSet.forEach((questionSet)=>
    {
        var question;
        try
        {
            question = getQuestion(questionSet);
            question = getQuestionWithLineBreak (question);
        }
        catch(err)
        {
            console.log(err);
            return;
        }
    
        var arrAnswer = getAnsArray(questionSet);
        

        let questionoName = `Q${ (qId<100)?(qId<10)?(`00`+qId):(`0`+qId):qId }`;

        qId++;

        
        let questionSetObj = { questionoName:questionoName, question:question, arrAnswer:arrAnswer}
        
        result.arrQuestionSet.push(questionSetObj);
    });

    return result;
}

function getQuestionWithLineBreak(question)
{
    let isLineFed = false;

    let startIdx = 0;
    startIdx = question.indexOf(lineFeed,startIdx);
    while (startIdx>=0 )
    {
        question = question.slice(0,startIdx+1)+(isLineFed?`</p>`:``)+`<p dir="ltr" style="text-align: left;">`+question.slice(startIdx+1);
        isLineFed = true;
        startIdx = question.indexOf(lineFeed,startIdx+1);
    }

    return question + (isLineFed?'</p>':``);
}

function getQuestion(questionSet)
{
    if(questionSet.length==0)
    {
        throw (`not a question`);
    }

    //remove the question number
    // let startIdx = 0;
    // while( !isNaN(parseInt(questionSet.charAt(startIdx))) )
    // {
    //     startIdx++;
    // }
    // questionSet = questionSet.substring(startIdx,questionSet.length);
    questionSet = removeStringB4Dot(questionSet);

    //make sure the question string til before answer
    let endIdx = getIdxOfAnsStart(questionSet);
    return questionSet.substring(0,endIdx);
}

function getAnsArray(questionSet)
{
    let startIdx = getIdxOfAnsStart(questionSet);
    startIdx++;

    let arrAnswer = questionSet.substring(startIdx,questionSet.length);
    arrAnswer = arrAnswer.split(lineFeed);

    return arrAnswer;
}

function getIdxOfAnsStart(string)
{
    let idx = string.indexOf(lineFeed+'A');
    if(idx<0)
    {
        idx = string.indexOf(lineFeed+'xA');
    }
    
    if(idx<0){
        idx = string.indexOf(lineFeed+'XA');
    }

    return idx;
}

function removeStringB4Dot(string)
{
    return string.substring(string.indexOf('.')+1,string.length);
}

module.exports = getSerializedObj;
// module.exports = {getTabRemoved,getTribleLinefeedRemoved,getDoubleLineFeedWithARemoved,getQuestionSetObject,getNoneExpectCharData,getHeaderRemoved,getCarriageReturnRemoved};