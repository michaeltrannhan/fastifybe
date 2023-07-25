import { IsString, IsNumber, IsNotEmpty, IsDate, } from 'class-validator';

export class CreateBookDto {
    @IsNotEmpty()
    id: number;

    @IsString()
    title: string;

    @IsString()
    author: string;

    @IsString()
    // @IsDate()
    publishedDate: string;

    @IsString()
    description: string;

    @IsNumber()
    price: number;
}
