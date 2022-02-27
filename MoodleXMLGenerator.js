function getMoodleXMLHeader()
{
    return "<?xml version=\"1.0\" encoding=\"UTF-8\"?> \n\
    <quiz> \n\
    <!-- question: 0  --> \n\
      <question type=\"category\"> \n\
        <category> \n\
          <text>$course$/top/Default for legolastai_1</text> \n\
        </category> \\n\
        <info format=\"moodle_auto_format\"> \n\
          <text>The default category for questions shared in context 'legolastai_1'.</text> \n\
        </info> \n\
        <idnumber></idnumber> \n\
      </question>\n";
}

function getMoodleXMLContent(obj)
{
    let output = ``;
    
    obj.arrQuestionSet.forEach( (questionSet)=>
    {
        output += getQuestionSetXML(questionSet.questionoName, questionSet.question, questionSet.arrAnswer);
    });


    return output;
}


function getQuestionSetXML(questionName,question,arrAnswer)
{
    let output = getQuestionXML(questionName, question);
    
    
    let isCorrect = false;
    arrAnswer.forEach(ans=>
    {
        if(ans[0] == 'x')
        {
            isCorrect = true;
        }
        else
        {
            isCorrect = false;
        }
        
        output+= getAnswerXML( removeStringB4Dot(ans),isCorrect)
        
    });

    output += `</question>\n`;

    return output;
}

function getQuestionXML(questionoName,question)
{
    return  `<question type=\"multichoice\"> \n\
    <name> \n\
    <text> ${questionoName}</text> \n\
    </name> \n\
    <questiontext format=\"html\"> \n\
    <text><![CDATA[<p dir=\"ltr\" style=\"text-align: left;\"> ${question}</p>]]></text> \n\
    </questiontext> \n\
    <generalfeedback format=\"html\"> \n\
    <text></text> \n\
    </generalfeedback> \n\
    <defaultgrade>1.0000000</defaultgrade> \n\
    <penalty>0.3333333</penalty> \n\
    <hidden>0</hidden> \n\
    <idnumber></idnumber> \n\
    <single>true</single> \n\
    <shuffleanswers>true</shuffleanswers> \n\
    <answernumbering>abc</answernumbering> \n\
    <showstandardinstruction>0</showstandardinstruction> \n\
    <correctfeedback format=\"html\"> \n\
    <text>Your answer is correct.</text> \n\
    </correctfeedback> \n\
    <partiallycorrectfeedback format=\"html\"> \n\
    <text>Your answer is partially correct.</text> \n\
    </partiallycorrectfeedback> \n\
    <incorrectfeedback format=\"html\"> \n\
    <text>Your answer is incorrect.</text> \n\
    </incorrectfeedback> \n\
    <shownumcorrect/> \n`;
}

function getAnswerXML(ans, isCorrect)
{
    return `<answer fraction=\"${isCorrect?100:0}\" format=\"html\"> \n\
    <text><![CDATA[<p dir=\"ltr\" style=\"text-align: left;\">${ans}</p>]]></text> \n\
    <feedback format=\"html\"> \n\
    <text></text> \n\
    </feedback> \n\
    </answer> \n`;
}

function removeStringB4Dot(string)
{
    return string.substring(string.indexOf('.')+1,string.length);
}

module.exports = {getMoodleXMLHeader, getMoodleXMLContent};