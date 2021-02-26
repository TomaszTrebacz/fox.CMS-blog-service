import { Factory, Seeder } from 'typeorm-seeding';
import { Connection } from 'typeorm';
import { CategoryEntity } from '../entities/category.entity';
import { PostEntity } from '../entities/post.entity';

export default class SQLSeed implements Seeder {
  public async run(factory: Factory, connection: Connection): Promise<any> {
    const res = await connection
      .createQueryBuilder()
      .insert()
      .into(CategoryEntity)
      .values([
        { name: 'Travel' },
        { name: 'Productivity' },
        { name: 'Food' },
        { name: 'HR' },
        { name: 'anotherName' },
      ])
      .execute();

    await connection
      .createQueryBuilder()
      .insert()
      .into(PostEntity)
      .values([
        {
          title: `Oh right. I forgot about the battle.`,
          text: `<b>Fry!</b> Stay back! He's too powerful! Hey! I'm a monster, what do I care what you think? In your time, yes, but nowadays shut up! 
          Besides, these are adult stemcells, harvested from perfectly healthy adults whom I killed for their stemcells.
          For the last time, I don't like lilacs! Your 'first' wife was the one who liked lilacs!`,
          imageUrl: 'https://i.ibb.co/YP4JvNB/Created-with-GIMP.jpg',
          userId: '8055d923-0cfd-40e9-879e-638e8ffc7475',
          category: res.raw[0].id,
        },
        {
          title: `Office`,
          text: `Turd polishing peel the onion proceduralize, or we just need to put these last issues to bed, 
          but service as core &innovations as power makes our brand, 
          nor bench mark, work. Dear hiring manager:. We need to button up our approach let's pressure test this diversify kpis yet deep dive.`,
          imageUrl: 'https://i.ibb.co/d7z713s/stock7.jpg',
          userId: 'ded8dc2f-ab3b-49a5-8f14-34bf89bc20ca',
          category: res.raw[1].id,
        },
        {
          title: `Lemonade`,
          text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Suspendisse volutpat sollicitudin est vitae elementum. 
          Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. 
          Vivamus in elit eu leo aliquet malesuada eget non nisl. Fusce volutpat, velit et faucibus ornare, tellus nibh scelerisque.`,
          imageUrl: 'https://i.ibb.co/cDLK67j/stock4.jpg',
          userId: '8055d923-0cfd-40e9-879e-638e8ffc7475',
          category: res.raw[2].id,
        },
        {
          title: `Organizational Culture`,
          text: `Vestibulum cursus diam eu lectus congue dictum. Aliquam non mi a turpis elementum lobortis eu pretium felis. 
          Etiam accumsan molestie dolor ac bibendum. Mauris lobortis tortor sem, vitae iaculis est pulvinar non. 
          Praesent scelerisque pretium augue vitae euismod. Cras euismod ex sed nisl pulvinar imperdiet.`,
          imageUrl: 'https://i.ibb.co/gRPdnK9/stock5.jpg',
          userId: '8055d923-0cfd-40e9-879e-638e8ffc7475',
          category: res.raw[1].id,
        },
        {
          title: `You are the last hope of the universe.`,
          text: `These old Doomsday Devices are dangerously unstable. I'll rest easier not knowing where they are. 
          Switzerland is small and neutral! We are more like Germany, ambitious and misunderstood!
          Oh, how awful. Did he at least die painlessly? …To shreds, you say.`,
          imageUrl: 'https://i.ibb.co/K2KKGsk/stock6.jpg',
          userId: '3d248dbc-4475-46e1-8361-6273d0f1fa9c',
          category: res.raw[0].id,
        },
        {
          title: `What?!`,
          text: `All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it? Your eyes can deceive you. 
          Don't trust them. I have traced the Rebel spies to her. Now she is my only link to finding their secret base.
          All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it?`,
          imageUrl: 'https://i.ibb.co/pwZsCWx/stock2.jpg',
          userId: '2bac1170-827d-49ad-b7a3-9c76e6ad83e9',
          category: res.raw[0].id,
        },
        {
          title: `A newt?`,
          text: `Listen. Strange women lying in ponds distributing swords is no basis for a system of government. 
          Supreme executive power derives from a mandate from the masses, not from some farcical aquatic ceremony. 
          You don't frighten us, English pig-dogs!`,
          imageUrl: 'https://i.ibb.co/znMvxYw/stock3.jpg',
          userId: 'ded8dc2f-ab3b-49a5-8f14-34bf89bc20ca',
          category: res.raw[0].id,
        },
        {
          title: `Whatever?!`,
          text: `All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it? Your eyes can deceive you. 
          Don't trust them. I have traced the Rebel spies to her. Now she is my only link to finding their secret base.
          All right. Well, take care of yourself, Han. I guess that's what you're best at, ain't it?`,
          imageUrl: 'https://i.ibb.co/pwZsCWx/stock2.jpg',
          userId: '2bac1170-827d-49ad-b7a3-9c76e6ad83e9',
          category: res.raw[2].id,
        },
      ])
      .execute();
  }
}
