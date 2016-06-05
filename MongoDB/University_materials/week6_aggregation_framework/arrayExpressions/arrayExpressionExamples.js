//$filter example
db.companies.aggregate([
    { $match: {"funding_rounds.investments.financial_org.permalink": "greylock" } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        rounds: { $filter: {
            input: "$funding_rounds",//specify an array
            as: "round",//specify the name that we want to use for the array
            cond: { $gte: ["$$round.raised_amount", 100000000] } } } //filter the array based on this condition
            //$$round means that we use the specified variable round that we defined in the 'as' section
    } },
    { $match: {"rounds.investments.financial_org.permalink": "greylock" } },    
]).pretty()




//
db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        first_round: { $arrayElemAt: [ "$funding_rounds", 0 ] },//look in the $funding_rounds array where first_round is the first elemt in the array
        last_round: { $arrayElemAt: [ "$funding_rounds", -1 ] }//look in the $funding_rounds array where last_round is the last element in the array
    } }
]).pretty()


db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        first_round: { $slice: [ "$funding_rounds", 1 ] },
        last_round: { $slice: [ "$funding_rounds", -1 ] }
    } }
]).pretty()



db.companies.aggregate([
    { $match: { "founded_year": 2010 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        early_rounds: { $slice: [ "$funding_rounds", 1, 3 ] }
    } }
]).pretty()



db.companies.aggregate([
    { $match: { "founded_year": 2004 } },
    { $project: {
        _id: 0,
        name: 1,
        founded_year: 1,
        total_rounds: { $size: "$funding_rounds" }
    } }
]).pretty()



    

