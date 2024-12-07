import { ApiProperty } from "@nestjs/swagger";

export class TokenDoc{
    @ApiProperty({description: 'token login', type: String, example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjIsInVzZXJFbWFpbCI6InNoYW1teUBnbWFpbC5jb20iLCJ1c2VyUm9sZSI6ImFkbWluIiwiaXNzIjoiQ3VsdHVyZSBDb2RlIFVzZXIiLCJhdWQiOiJ1c2VycyBmcm9tIEN1bHR1cmUgQ29kZSIsImlhdCI6MTczMzUxOTkwMiwiZXhwIjoxNzMzOTUxOTAyfQ.N-2eQZ_hnE74k04ZocO25ygYyLGT-a5h6XZCoBTZPIw", title: 'Token'})
    token: String
}