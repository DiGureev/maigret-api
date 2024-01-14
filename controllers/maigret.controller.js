import {spawn} from 'child_process';
import fs from 'fs'

//main function to get results in top 10 (to get the results faster for test)
export const getInfoTop10 = (req, res) => {
    //get the url parametrs
    const {username} = req.params;
    let data1;

    try{
        //run python script as a child process
        const pythonScript = spawn("python", ["../maigret/maigret.py", username, "--json", "simple", "--top-sites", "10"]);

        //get the logs
        pythonScript.stdout.on('data', function(data) {
                data1 = data.toString();

                if (data1.includes('JSON simple report')){
                    
                    //final string of the logs contain 'JSON simple report' substring, meaning - the report is done and we can read it
                    fs.readFile(`./reports/report_${username}_simple.json`, "utf8", (err, jsonString) => {
                        if (err) {
                                console.log(err);
                                return;
                        }

                        res.json(jsonString);
                    })
                }
        })
    }catch (e) {
      console.log(e)
      res.status(404).json({msg: "Can't get the data"});
    }
  };