// @Get()
// async getPaginatedRides(
//   @Query('page') page = 1,
//   @Query('limit') limit = 10,
// ) {
//   return this.rideService.getPaginatedRides(+page, +limit);
// }

// async getPaginatedRides(page: number, limit: number) {
//   const [data, total] = await this.rideRepo.findAndCount({
//     skip: (page - 1) * limit,
//     take: limit,
//     order: { ride_Date: 'ASC' }, // optional sort
//   });

//   return {
//     data,
//     total,
//     page,
//     lastPage: Math.ceil(total / limit),
//   };
// }
