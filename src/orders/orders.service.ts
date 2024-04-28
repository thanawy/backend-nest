import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from '@orders/entities/order.entity';
import { Repository } from 'typeorm';
import { CreateOrderDto } from '@orders/dto/create.order.dto';
@Injectable()
export class OrdersService {

    constructor(
        @InjectRepository(Order) 
        private ordersRepository: Repository<Order>
    ) {}

    async findAll(): Promise<Order[]> {
        return this.ordersRepository.find();
    }

    async findOne(id: string): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ id });
    }

    async findOneWithOrderId(id: string): Promise<Order | null> {
        return this.ordersRepository.findOneBy({ orderId: id });
    }

    async create(createOrderDto: CreateOrderDto): Promise<Order> {
        return this.ordersRepository.save(createOrderDto);
    }

    async remove(id: string): Promise<void> {
        await this.ordersRepository.delete(id);
    }

}
