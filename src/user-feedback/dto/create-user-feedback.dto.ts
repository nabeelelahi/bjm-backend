import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { BaseCreateDto, Role } from 'src/base/base.dto';

export class CreateUserFeedbackDto extends BaseCreateDto {
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    title: string;
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    description: string;
    user: {
        _id: string;
        role: Role;
        name: string;
        email: string;
        mobile_no: string;
        address: string;
        username: string;
    };
    feedback_status?: string

    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false,
    })
    image: Express.Multer.File;
    image_url: string
}
