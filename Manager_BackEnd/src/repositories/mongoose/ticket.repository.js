const { MongooseRepository } = require("ca-webutils");

class MongooseTicketRepository extends MongooseRepository {
    constructor(model) {
        super(model);
    }
    async getTicketCountByStatusForManager(filter) {
        try {
            const managerId = filter.managerId;
            const result = await this.model.aggregate([
                {
                    $lookup: {
                        from: 'employee',
                        localField: 'employeeId',
                        foreignField: 'employeeId',
                        as: 'employeeDetails'
                    }
                },
                { $unwind: { path: '$employeeDetails', preserveNullAndEmptyArrays: true } },
                {
                    $match: {
                        'employeeDetails.managerId': managerId
                    }
                },
                {
                    $group: {
                        _id: '$ticketStatus',
                        count: { $sum: 1 }
                    }
                }
            ]);
            return result.reduce((acc, curr) => {
                acc[curr._id] = curr.count;
                return acc;
            }, {});
        } catch (error) {
            console.error('Error fetching ticket count by status for manager:', error);
            throw error;
        }
    }

    async getTicketsForManagerByStatus(filter) {
        try {
            const matchConditions = { 'employeeDetails.managerId': filter.managerId };

            if (filter.ticketStatus) matchConditions.ticketStatus = filter.ticketStatus;
            if (filter.ticketId) matchConditions.ticketId = filter.ticketId;

            const result = await this.model.aggregate([
                {
                    $lookup: {
                        from: 'employee',
                        localField: 'employeeId',
                        foreignField: 'employeeId',
                        as: 'employeeDetails'
                    }
                },
                { $unwind: { path: '$employeeDetails', preserveNullAndEmptyArrays: false } },
                { $match: matchConditions },
                {
                    $project: {
                        _id: 1,
                        ticketId: 1,
                        ticketType: 1,
                        ticketDescription: 1,
                        ticketRaiseDate: 1,
                        ticketStatus: 1,
                        ticketPriority: 1,
                        employeeId: '$employeeDetails.name'
                    }
                }
            ]);

            return result.length ? result : { message: "No matching tickets found for this manager" };
        } catch (error) {
            console.error('Error fetching tickets for manager:', error);
            throw error;
        }
    }

    async getTicketCountByEmployeeForManager(filter) {
        try {
          const result = await this.model.db
            .collection("employee")
            .aggregate([
              { $match: { managerId: filter.managerId } },
              { 
                $lookup: {
                  from: "tickets",           // assuming your tickets collection is called "tickets"
                  localField: "employeeId",  // employee field in the employee collection
                  foreignField: "employeeId",// matching field in the tickets collection
                  as: "tickets"
                }
              },
              {
                $addFields: {
                  ticketCount: { $size: "$tickets" } // count tickets; returns 0 if none found
                }
              },
              {
                $project: {
                  _id: 0,
                  employeeId: 1,
                  employeeName: "$name",
                  ticketCount: 1
                }
              }
            ])
            .toArray();
      
          return result.length ? result : [{ message: "No employees found under this manager" }];
        } catch (error) {
          console.error("Error fetching ticket count per employee for manager:", error);
          throw error;
        }
      }
      
    
}

MongooseTicketRepository._dependencies = ['ticket'];
module.exports = MongooseTicketRepository;
