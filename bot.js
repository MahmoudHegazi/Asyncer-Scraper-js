/* (asyncerBot) scraped all data succesfully with js console only (real scraper task project) https://epbcpublicportal.environment.gov.au/all-referrals/# (1h robot) (note dynamic as it start from the normal user selected page then keep the next page and also it controlled by code as setting the max, for example u have 10 pages if u scrape all then max should be 10, but if u start from page 7 u need set max 3 even if u not set do not worry the robot never make error, or add 1 single repeated data so it just will run and continue so set max for your performance and wait for data) */
let data = [];
/* static data and element mapper (here control the objName and also update the scraper targting th if for ex website updated th content */
const cols = {
    'EPBC Number': 'epbc',
    'Project': 'project',
    'Proposer/Approval Holder Name': 'holderName',
    'Location': 'location',
    'Industry Type': 'industryType',
    'Valid Date': 'validDate',
    'Project Status': 'projectStatus',
    'Primary Jurisdiction': 'primaryJurisdiction'
};

function objFound(obj) {
    return (data.findIndex((existObj) => {
        let matchScore = Object.keys(obj).length;
        Object.keys(obj).forEach((argObjK) => {
            if (existObj.hasOwnProperty(argObjK) && existObj[argObjK] === obj[argObjK]) {
                matchScore -= 1;
            }
        });
        return (matchScore === 0) ? true : false;
    })) != -1 ? true : false;
}
async function asyncerTrigger(cb, delay = 0) {
    return new Promise((res, rej) => {
        function asyncer() {
            if ($("table tbody tr").length == 0) {
                console.log('keep wait');
                setTimeout(asyncer, 50, cb); // note cb is scoped var
            } else {
                console.log('done loading of external app');
                let result = null;
                if (typeof(cb) === 'function') {
                    result = cb();
                }
                /* add delay after done async think time.sleep */
                setTimeout(() => {
                    return res(result); // here cbcalled then returned res
                }, delay);

            }
        }
        asyncer();
    });
}

function scrapeTask() {
    $("table tbody tr[data-name]").each((_i, row) => {
        const obj = {
            epbc: '',
            project: '',
            holderName: '',
            location: '',
            industryType: '',
            validDate: '',
            projectStatus: '',
            primaryJurisdiction: ''
        };
        for (let thPropVal in cols) {
            const cell = $(row).find(`td[data-th='${thPropVal}']`);
            if (cell.length) {
                obj[cols[thPropVal]] = cell.text();
            }
        };
        if (!objFound(obj)) {
            console.log('scrapped one row sucessfully', obj);
            data.push(obj);
        } else {
            console.log("found repeated obj ignored", obj);
        }
    });
    return data;
}

async function asyncerScraper(max = 5, maxDelaySeconds = 10) {
    let clickedBtn = 0;
    let current = $("ul.pagination li.active"); /* note the inital not used only in console */
    for (let i = 0; i < max; i++) {
        try {
            if (clickedBtn > 0) {
                /* note it dynamic all u need as user click starter page ex btn 100 */
                current = $("ul.pagination li.active").next('li');
                const currentLink = current.find('a');
                if (currentLink.length) {
                    currentLink.click();
                } else {
                    console.log('one of li not have link will incerase clickedBtn and continue');
                    clickedBtn += 1;
                    continue;
                }
            }
            console.warn(`we going scrape page: ${current.text()}`);
            const randomDelay = ((Math.floor(Math.random() * maxDelaySeconds) + 1) * 1000);
            const newData = await asyncerTrigger(scrapeTask, 3000);
            console.warn(`i was delayed:${randomDelay} and Now completed asyncTask:`, newData);
        } catch (error) {
            console.error(error, 'robot will continue');
        }
        clickedBtn += 1;
    }
    alert("thanks for using asyncer scraper Bot completed to get your data copy data object, write in console data to see data then right click and select copy this object can used by any other backend lang after update format");
}
