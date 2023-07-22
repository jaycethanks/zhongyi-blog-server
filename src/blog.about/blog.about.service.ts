import { PrismaService } from '@/prisma/prisma.service';
import { Injectable, UseFilters } from '@nestjs/common';
import { AboutDTO } from './dto/about.dto/about.dto';
import { Result } from '@/admin/dto/Result.dto';
import { GraphqlExceptionFilter } from '@/graphql/exception/GraphqlExceptionFilter';
@Injectable()
export class BlogAboutService {
  constructor(private prisma: PrismaService) {}
  async findOne(userid: string): Promise<AboutDTO | null> {
    const [getAvatar, getAbout] = await Promise.all([
      this.prisma.user.findUnique({
        select: {
          avatar: true,
        },
        where: {
          userid: userid,
        },
      }),
      this.prisma.about.findUnique({
        where: {
          userid,
        },
        select: {
          links: true,
          msg: true,
        },
      }),
    ]);
    const res = {
      avatar: getAvatar.avatar,
      ...getAbout,
    };
    return res;
  }
}

// import { Post } from '@prisma/client';
// import { NewPost, UpdatePost } from 'src/graphql.schema';
// import { PrismaService } from '../prisma/prisma.service';

// @Injectable()
// export class PostsService {
//   constructor(private prisma: PrismaService) {}

//   async findOne(id: string): Promise<Post | null> {
//     return this.prisma.post.findUnique({
//       where: {
//         id,
//       },
//     });
//   }

//   async findAll(): Promise<Post[]> {
//     return this.prisma.post.findMany({});
//   }

//   async create(input: NewPost): Promise<Post> {
//     return this.prisma.post.create({
//       data: input,
//     });
//   }

//   async update(params: UpdatePost): Promise<Post> {
//     const { id, ...params_without_id } = params;

//     return this.prisma.post.update({
//       where: {
//         id,
//       },
//       data: {
//         ...params_without_id,
//       },
//     });
//   }

//   async delete(id: string): Promise<Post> {
//     return this.prisma.post.delete({
//       where: {
//         id,
//       },
//     });
//   }
// }
