//================================================================================================
//------------------  Explain, generally, what is meant by a NoSQL database -------------------
/*   
    - being non­-relational, distributed, open­source and horizontally scalable
    - schema-­free
    - easy replication support
    - simple API
    - eventually consistent / BASE (not ACID)
    - a huge amount of data
    - NoSQL Does Not offer ACID guarantees
            - Atomicity - Everything in a transaction must happen successfully or none of the changes are committed.
            - Consistency - The data will only be committed if it passes all the rules in place in the database
            - Isolation - Transactions won't affect other transactions by changing data that another operation is counting
            - Durability - Once data is committed, it is durably stored and safe against errors
    - Instead it offers Eventual Consistency
            - Informally guarantees that, if no new updates are made to a given data item, eventually all accesses to that 
              item will return the last updated value. 
*/

/*
    Why NoSQL??
        - provides a mechanism for storage and retrieval of data that is modeled in 
            means other than the tabular relations used in relational databases
        - Simplicity of design
        - Finer control over availability    
        - to handle new, multi­-structured data types 
        - identify viable alternatives to expensive proprietary database software and hardware
        - agility or speed of development
        - the relational data model is not well aligned with the needs of their applications.
            Consider:
            - Developers are working with applications that create new, rapidly
                changing data types — structured, semi­-structured, unstructured and
                polymorphic data — and massive volumes of it
            - Applications that once served a finite audience are now delivered as
                services that must be always­ on, accessible from many different devices
                and scaled globally
            - Organizations are now turning to scale­out architectures using open
                source software, commodity servers and cloud computing instead of large
                monolithic servers and storage infrastructure
                
         - When compared to relational databases, many NoSQL systems share several
            key characteristics including a more flexible data model, higher scalability, and
            superior performance
         - Rather than spreading out a record across multiple columns and tables
            connected with foreign keys, each record and its associated (i.e., related) data
            are typically stored together in a single document. This simplifies data access
            and, in many cases, eliminates the need for expensive JOIN operations and
            complex, multi­-record transactions
*/

/* 
                The CAP theorem
                
       - Consistency
            -> All the servers in the system will have the same data so anyone using the system will 
            get the same copy regardless of which server answers their request  
       - Availability
            -> The system will always respond to a request (even if it's not the latest data or consistent 
            across the system or just a message saying the system isn't working). 
       - Partition Tolerance
            -> The system continues to operate as a whole even if individual servers fail or can't be reached. 
       - It's theoretically impossible to have all 3 requirements met, so a combination of 2 must be chosen 
       and this is usually the deciding factor in what technology is used.               
*/
//=====================================================================================================

//---------------   Explain how databases like MongoDB and redis would be classified in the NoSQL world -----

//Nosql Databases Types:
//Key-Value databases
//Document databases
//column family databases
//Graph databases

/*   
                  >>>      MongoDB    <<<
                        
        - Document Model database
        - use a structure that is like JSON
        - Documents provide an intuitive and natural way to model data that
            is closely aligned with object­-oriented programming – each
            document is effectively an object
        - each record and its associated (i.e., related) data are typically
            stored together in a single document. This simplifies data access
            and, in many cases, eliminates the need for expensive JOIN
            operations and complex, multi­-record transactions
        - In a document database, the notion of a schema is dynamic: each
            document can contain different fields. This flexibility can be
            particularly helpful for modeling unstructured and polymorphic data.
            It also makes it easier to evolve an application during development,
            such as adding new fields
        - Document databases are general purpose, useful for a wide variety
            of applications due to the flexibility of the data model, the ability to
            query on any field and the natural mapping of the document data
            model to objects in modern programming languages
            
            
                    >>>>>   Redis  <<<<<<<<<<<<<
         - Redis is an open source, in-memory persistent key-value store
                    - in memory vs persistent
                        - in memory - The entire dataset needs to be able to exist in memory on the server 
                                        to take advantage of the potential speed benefits
                        - persistence - With respect to persistence, by default, Redis snapshots the database to 
                                        disk based on how many keys have changed. 
                                        You configure it so that if X number of keys change, then save the database every Y seconds                
         - REmote DIctionary Server    
         - Redis is known for being extremely fast       
         - Key-­Value Model database
            - Every item in the database is stored as an attribute name, or
                key, together with its value. 
            - Data can only be queried by the key. This model can be
                useful for representing polymorphic and unstructured data,
                as the database does not enforce a set schema across
                key­-value pairs    
            - useful for a narrow set of applications that only query data
                by a single key value. The appeal of these systems is their
                performance and scalability, which can be highly optimized
                due to the simplicity of the data access patterns and opacity
                of the data itself
            - An “Aggregate” is a collection of related objects that we wish to treat as a unit
                    - The database cannot see structure within the aggregate
                    - document databases can see structure within the aggregate 
            - Redis Data structures
                    - Strings - binary safe - this means that a Redis string can contain any kind of data
                    - Hashes - maps between string fields and string values, so they are the perfect data type to represent objects
                    - Lists - let you store and manipulate an array of values for a given key. You can add values to the list, 
                        get the first or last value and manipulate values at a given index. Lists maintain their order and have efficient index-based operations   
                    - Sets - used to store unique values and provide a number of set-based operations, like unions. Sets aren’t ordered but they provide 
                        efficient value-based operations.
                    - Sorted Sets - like sets but with a score. The score provides sorting and ranking capabilities
          
          
          - When to use Redis:
                    - Caching
                    - Session Store
                    - Leaderboards
                    - Order by user votes and time
                    - Analytics              
*/

//=====================================================================================================

//--------------- Explain, using a relevant example, how redis (or a similar data store)  -------------
//-----------        can increase scalability (drastic) for a server, using server side sessions  -----

//https://github.com/NodeRedis/node_redis

//redis_session example


//==============================================================================================
//----- Explain, using a relevant example, a full MEAN application including relevant -----------
//--------     test cases to test the REST-API (not on the production database)  ----------------

//mean_app example without tests!!!!!