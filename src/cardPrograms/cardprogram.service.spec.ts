import { Test, TestingModule } from '@nestjs/testing';
import { CardProgramService } from './cardprogram.service';

describe('CardProgramService', () => {
  let service: CardProgramService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CardProgramService],
    }).compile();

    service = module.get<CardProgramService>(CardProgramService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
