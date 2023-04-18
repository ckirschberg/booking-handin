import { Controller, Get, Post, Body, Param, Delete, UseGuards, Request, UseInterceptors, UploadedFile, UploadedFiles, Req } from '@nestjs/common';
import { ProblemsService } from './problems.service';
import { CreateProblemDto } from './dto/create-problem.dto';
import { JwtAuthGuard } from './../authentication/jwt-auth.guard';
import { UsersService } from './../users/users.service';
import { AuthGuard } from '@nestjs/passport';
import { AdminGuard } from './../authentication/admin.guard';
import { TenantGuard } from './../authentication/tenant.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';



@Controller('problems')
export class ProblemsController {
  constructor(private readonly problemsService: ProblemsService, private readonly usersService: UsersService) {}

  // @UseGuards(JwtAuthGuard, TenantGuard)
  @Post()
  async create(@Req() req, @Body() body) {
      console.log("body", body);
      
      const display_url = await this.problemsService.saveImage(body.data.photo.base64);
      
      console.log("image url", display_url);
      
      const createProblemDto = new CreateProblemDto(body.data.subject, body.data.description, display_url);
      //  createProblemDto.tenant = 
      //   (await this.usersService.findOne(req.user.username)).tenant;
      
        createProblemDto.tenant = (await this.usersService.findOne('Zishan')).tenant; // Hardcode TEST TEST TEST
      
      return this.problemsService.create(createProblemDto);

  }

  @Get()
  // @UseGuards(JwtAuthGuard, AdminGuard)
  findAll(@Request() req: any) {
    // console.log("user in controller", req.user);
    
    return this.problemsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.problemsService.findOne(+id);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateProblemDto: UpdateProblemDto) {
  //   return this.problemsService.update(+id, updateProblemDto);
  // }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.problemsService.remove(+id);
  }
}
