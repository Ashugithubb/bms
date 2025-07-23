import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
}

// const results = await this.rideRepo.find({
//   where: {
//     fare: Between(100, 300),
//     fromLocation: Like('%Delhi%'),
//   },
// });


// const cheapRides = await this.rideRepo.find({
//   where: {
//     fare: LessThan(200),           // fare < 200
//     seatsAvailable: MoreThan(0),   // AND seatsAvailable > 0
//   },
// });


// | Operator          | Usage                  | Description                        |
// | ----------------- | ---------------------- | ---------------------------------- |
// | `LessThan`        | `LessThan(200)`        | `<` Less than                      |
// | `MoreThan`        | `MoreThan(200)`        | `>` Greater than                   |
// | `LessThanOrEqual` | `LessThanOrEqual(200)` | `<=`                               |
// | `MoreThanOrEqual` | `MoreThanOrEqual(200)` | `>=`                               |
// | `Equal`           | `Equal('value')`       | `=` Equal                          |
// | `Not`             | `Not(123)`             | `!=` Not equal                     |
// | `Like`            | `Like('%keyword%')`    | SQL `LIKE` for pattern matching    |
// | `ILike`           | `ILike('%abc%')`       | Case-insensitive `LIKE` (Postgres) |
// | `Between`         | `Between(100, 200)`    | Range query                        |
// | `In`              | `In([1, 2, 3])`        | Value is in a list                 |
// | `IsNull`          | `IsNull()`             | Value is `NULL`                    |
