import { Test, TestingModule } from '@nestjs/testing';
import { CardProgramController } from './cardprogram.controller';

describe('CardProgramController', () => {
  let controller: CardProgramController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CardProgramController],
    }).compile();

    controller = module.get<CardProgramController>(CardProgramController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
