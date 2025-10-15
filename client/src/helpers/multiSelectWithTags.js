const workers = [
    {code: 58, fullName:"maayan meshulam"},
    {code: 78, fullName:"rotem meshulam"},
    {code: 98, fullName:"hadar meshulam"},
    {code: 21, fullName:"linor ronen"},
    {code: 70, fullName:"maya shwarz"},
];

const serachInArrWorkers = (expression)=>{
    const newArrIncludes = workers.map(worker=>worker[fullName].includes(expression));
}


export default {serachInArrWorkers}
