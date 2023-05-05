const fs = require("fs"); 

const file = "logs.txt"; 

const findCommonIP = () => {
  
  //  array to hold the IP addresses and their counts
  const ips = [];

  try {
    
    const data = fs.readFileSync(file, "utf8"); 
    
    // split the data in  the log file into an array of strings where each string represents a line in the file
    let logsArray = data.split("\n");

    for (const i of logsArray) {

      const line = i.split(",");

      // extract the IP address from the current line by taking the last item in the array
      const ip = line[line.length - 1].trim().replace("\r", "");

      const item = ips.find((x) => x.ip === ip);

      // if the current IP address is already in the ips array, increment its count by 1
      // otherwise, add the IP address to the ips array with a count of 1

      ips.includes(item)
        ? (item.count += 1)
        : ips.push({ ip: ip, count: 1 });
    }
  } catch (err) {
    console.error(err);
  }

  // sort the ips array in descending order based on the count of each IP address, then return the first 10 elements in the array
  return ips.sort((a, b) => b.count - a.count).slice(0, 10);
};

console.log(findCommonIP());
