import { InputType, PartialType } from '@nestjs/graphql';
import { Printer } from './printer.model';

@InputType()
export class PrinterFilterInput extends PartialType(Printer, InputType) {}
