import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1663520355593 implements MigrationInterface {
  name = 'init1663520355593';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "prices" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price_0_to_1" numeric(78,18) NOT NULL, "price_1_to_0" numeric(78,18) NOT NULL, "left_reserve" numeric(78,0) NOT NULL, "right_reserve" numeric(78,0) NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed_at" TIMESTAMP WITH TIME ZONE, "pair_id" uuid, CONSTRAINT "PK_2e40b9e4e631a53cd514d82ccd2" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "twaps" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "price_0_to_1" numeric(78,18) NOT NULL, "price_1_to_0" numeric(78,18) NOT NULL, "interval" integer NOT NULL, "from_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "to_timestamp" TIMESTAMP WITH TIME ZONE NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed_at" TIMESTAMP WITH TIME ZONE, "pair_id" uuid, CONSTRAINT "PK_e5b7a6501748be176bcecc04c55" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pairs" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "left_token" uuid NOT NULL, "right_token" uuid NOT NULL, "scale" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_bfc550b07b52c37db12aa7d8e69" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_e0c9d9aeacf3ad446a3a660ae6" ON "pairs" ("address") `,
    );
    await queryRunner.query(
      `CREATE TABLE "tokens" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "address" character varying NOT NULL, "name" character varying NOT NULL, "symbol" character varying NOT NULL, "decimals" integer NOT NULL, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(), "removed_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_3001e89ada36263dabf1fb6210a" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_8887c0fb937bc0e9dc36cb62f3" ON "tokens" ("address") `,
    );
    await queryRunner.query(
      `CREATE TABLE "pairs_tokens_tokens" ("pairsId" uuid NOT NULL, "tokensId" uuid NOT NULL, CONSTRAINT "PK_7e2802cf56825d9e22898ad27f5" PRIMARY KEY ("pairsId", "tokensId"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_77f9ea7681e95a220c048c3caf" ON "pairs_tokens_tokens" ("pairsId") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_abfcb65c36adcd5f0902a6a45f" ON "pairs_tokens_tokens" ("tokensId") `,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" ADD CONSTRAINT "FK_b992e82a52bb9fdea5932e2e1f8" FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "twaps" ADD CONSTRAINT "FK_e2ed3f18d955a9927692f9364ed" FOREIGN KEY ("pair_id") REFERENCES "pairs"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "pairs_tokens_tokens" ADD CONSTRAINT "FK_77f9ea7681e95a220c048c3caf6" FOREIGN KEY ("pairsId") REFERENCES "pairs"("id") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "pairs_tokens_tokens" ADD CONSTRAINT "FK_abfcb65c36adcd5f0902a6a45ff" FOREIGN KEY ("tokensId") REFERENCES "tokens"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "pairs_tokens_tokens" DROP CONSTRAINT "FK_abfcb65c36adcd5f0902a6a45ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "pairs_tokens_tokens" DROP CONSTRAINT "FK_77f9ea7681e95a220c048c3caf6"`,
    );
    await queryRunner.query(
      `ALTER TABLE "twaps" DROP CONSTRAINT "FK_e2ed3f18d955a9927692f9364ed"`,
    );
    await queryRunner.query(
      `ALTER TABLE "prices" DROP CONSTRAINT "FK_b992e82a52bb9fdea5932e2e1f8"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_abfcb65c36adcd5f0902a6a45f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_77f9ea7681e95a220c048c3caf"`,
    );
    await queryRunner.query(`DROP TABLE "pairs_tokens_tokens"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_8887c0fb937bc0e9dc36cb62f3"`,
    );
    await queryRunner.query(`DROP TABLE "tokens"`);
    await queryRunner.query(
      `DROP INDEX "public"."IDX_e0c9d9aeacf3ad446a3a660ae6"`,
    );
    await queryRunner.query(`DROP TABLE "pairs"`);
    await queryRunner.query(`DROP TABLE "twaps"`);
    await queryRunner.query(`DROP TABLE "prices"`);
  }
}
