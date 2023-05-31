export interface ICacheConfig {
  type: 'database' | 'memory' | 'redis';
  duration: number;
}