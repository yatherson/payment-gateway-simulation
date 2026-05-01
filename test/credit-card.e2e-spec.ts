import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe, HttpStatus } from '@nestjs/common';
import { request, APIRequestContext } from '@playwright/test';
import { AppModule } from '../src/app.module';
import { PrismaService } from '../src/prisma/prisma.service';

describe('CreditCard API (e2e)', () => {
  let app: INestApplication;
  let prismaService: PrismaService;
    let apiContext: APIRequestContext;

    beforeAll(async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = moduleFixture.createNestApplication();

        // Habilitamos o ValidationPipe globalmente para simular o comportamento de produção
        app.useGlobalPipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }));

        await app.init();
        await app.listen(3000);

        prismaService = app.get<PrismaService>(PrismaService);

        // Instanciamos o client de API do Playwright
        apiContext = await request.newContext({
            baseURL: 'http://localhost:3000',
        });
    });

    afterAll(async () => {
        // Limpamos o banco do Floci.io após os testes para evitar poluição de estado
        await prismaService.creditCard.deleteMany();
        await prismaService.$disconnect();
        await apiContext.dispose();
        await app.close();
    });

    it('/v1/credit-cards (POST) - Deve criar e mascarar o cartão com sucesso', async () => {
        const payload = {
            cardNumber: '1234567890123456',
            holderName: 'YATHERSON L T SOUZA',
            brand: 'VISA',
            expirationDate: '2028-12-31',
            creditLimit: 5000.00
        };

        const response = await apiContext.post('/v1/credit-cards', {
            data: payload,
        });

        const body = await response.json() as Record<string, unknown>;

        expect(response.status()).toBe(HttpStatus.CREATED);
        expect(body.maskedNumber).toBe('**** **** **** 3456');
        expect(body.token).toBeDefined();

        // Validação de segurança: O PAN original não deve JAMAIS ser retornado
        expect(body.cardNumber).toBeUndefined();
    });
});