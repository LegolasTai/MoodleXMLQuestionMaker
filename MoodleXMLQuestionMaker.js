const moodleXMLGenerator = require(`./MoodleXMLGenerator.js`);
const questionSerialier = require(`./QuestionSerializer.js`);
const fs = require(`fs`);

var qId = 1;


const tab = String.fromCharCode(9);
const lineFeed = String.fromCharCode(10);

var output ="";


fs.writeFileSync(`questions-legolastai_1-Default for legolastai_1-20220225-1814.xml`,'');

fs.readdir(`./Questions`,(err,arrFile)=>
{
    if(err)
    {
        throw err;
    }

    let finishCount = 0;

    output += moodleXMLGenerator.getMoodleXMLHeader();

    arrFile.forEach(file=>
    {
        fs.readFile(`./Questions/${file}`,(err, data)=>
        {
            if(err)
            {
                throw err;
            }


            let obj = questionSerialier(data,qId)
            // return;

            qId += obj.arrQuestionSet.length;

            output += moodleXMLGenerator.getMoodleXMLContent(obj);

            finishCount++;
            if(finishCount >= arrFile.length)
            {
                fs.appendFile(`questions-legolastai_1-Default for legolastai_1-20220225-1814.xml`,output,(err)=>
                {
                    if(err)
                    {
                        throw (err);
                    }
                })
            }
            
        });
    });

});
