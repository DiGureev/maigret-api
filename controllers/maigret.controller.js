import {spawn} from 'child_process';
import fs from 'fs'

export const getInfoTop10 = (req, res) => {
    const {username} = req.params;
    let data1;

    try{
        const pythonScript = spawn("maigret", [username, "--json", "simple", "--top-sites", "10"]);

        pythonScript.stdout.on('data', function(data) {
                data1 = data.toString();

                if (data1.includes('JSON simple report')){
                    
                    fs.readFile(`./reports/report_${username}_simple.json`, "utf8", (err, jsonString) => {
                        if (err) {
                                console.log(err);
                                return;
                        }

                        res.json(jsonString);
                    })
                }
        })

        pythonScript.on('error', function(error){
            console.log('Error:', error)
        })
        
    }catch (e) {
      console.log(e)
      res.status(404).json({msg: "Can't get the data"});
    }
  };