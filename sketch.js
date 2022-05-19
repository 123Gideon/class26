const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Body = Matter.Body;
const Constraint = Matter.Constraint;

let engine;
let world;

var ground;

var top_wall;
var ball;
var ball1;

var btn1;
var btn2;
var chain1;
var chain2;

function setup() {
  createCanvas(400, 400);

  engine = Engine.create();
  world = engine.world;

  var ball_options = {
    restitution: 0.95,
  };

  btn2 = createImg("up.png");
  btn2.position(20, 30);
  btn2.size(50, 50);
  btn2.mouseClicked(vForce);

  ground = new Ground(200, 390, 400, 20);

  ball = Bodies.circle(100, 200, 20, ball_options);
  World.add(world, ball);

  ball1 = Bodies.circle(160, 300, 20, ball_options);
  World.add(world, ball1);
  chain1 = Matter.Constraint.create({
    length: 150,
    stiffness: 0.1,
    pointA: { x: 200, y: 50 },
    bodyB: ball,
  });
  World.add(world, chain1);

  chain2 = Matter.Constraint.create({
    length: 160,
    stiffness: 0.1,
    bodyA: ball,
    bodyB: ball1,
  });
  World.add(world,chain2)


}

function draw() {
  background(51);
  Engine.update(engine);

  rectMode(CENTER);
  ellipseMode(RADIUS);
  ellipse(ball.position.x, ball.position.y, 20);
  ellipse(ball1.position.x, ball1.position.y, 20);
  ground.show();

  push();
  stroke("green");
  strokeWeight(4);
  line(chain1.pointA.x, chain1.pointA.y, ball.position.x, ball.position.y);
  pop();

  push()
  stroke("blue")
  strokeWeight(4)
  line(ball.position.x,ball.position.y,ball1.position.x,ball1.position.y);
  pop()
}

function vForce() {
  Matter.Body.applyForce(ball1, { x: 0, y: 0 }, { x: 0, y: -0.05 });
}
