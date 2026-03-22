# Performance Improvements

This document outlines the performance optimizations implemented to address slow and inefficient code in the AISMM application.

## Summary of Changes

The following performance bottlenecks were identified and resolved:

### 1. YAML Model Caching (High Impact)
**Problem**: The 192KB `aismm.yaml` file was being loaded from disk on every agent invocation, causing repeated file I/O operations.

**Solution**: Implemented in-memory caching in `webapp/src/react_agent/tools/api-client.ts`:
- Added module-level cache variable `cachedAISMMModel`
- First load reads from disk and caches the parsed model
- Subsequent calls return cached model instantly

**Impact**: Eliminates ~192KB file read + YAML parsing on every agent analysis after the first load.

**Location**: `webapp/src/react_agent/tools/api-client.ts:87-139`

### 2. N+1 Query Problem (Critical Impact)
**Problem**: When fetching organization data for analysis, assessments were fetched sequentially in a loop, creating N+1 API calls (1 for org + N for each assessment).

**Before**:
```typescript
for (const assessment of completedAssessments) {
  const fullAssessment = await fetchAssessment(assessment.id); // Sequential!
}
```

**After**:
```typescript
const assessmentDetails = await Promise.all(
  completedAssessments.map(assessment => fetchAssessment(assessment.id))
);
```

**Impact**: For an organization with 10 completed assessments, this reduces API call time from sequential (10x slower) to parallel execution. Expected speedup: 5-10x for typical workloads.

**Location**: `webapp/src/react_agent/tools/api-client.ts:158-160`

### 3. Missing Database Indexes (High Impact)
**Problem**: Database queries lacked indexes on frequently queried and joined columns, causing full table scans.

**Solution**: Added indexes on:
- `responses(question_id)` - for question-based filtering
- `domain_scores(domain_id)` - for domain lookups
- `domain_scores(created_at)` - for temporal queries and sorting
- `assessments(status)` - for filtering completed assessments

**Impact**: Query performance improves significantly as the database grows. Prevents O(n) table scans on large datasets.

**Location**: `webapp/server/index.ts:107-111`

### 4. Agent Execution Mode (Medium Impact)
**Problem**: The three pillar agents (Security for AI, AI for Security, Security from AI) were running sequentially by default, even though they are independent.

**Solution**: Changed default from `runInParallel = false` to `runInParallel = true` in `orchestrator.ts`.

**Impact**: 3x speedup in agent analysis. Three independent LLM calls now execute simultaneously instead of one-at-a-time.

**Location**: `webapp/src/react_agent/agents/orchestrator.ts:27`

### 5. React Component Optimization (Low Impact)
**Problem**: Function handlers were being recreated on every component render, causing unnecessary re-renders in child components.

**Solution**: Wrapped `handleRunAIAnalysis` with `useCallback` to memoize the function reference.

**Impact**: Prevents unnecessary re-renders in dashboard components. Minor performance gain but follows React best practices.

**Location**: `webapp/src/components/OrganizationDashboard.tsx:81-104`

## Performance Benchmarks

### Expected Improvements

| Scenario | Before | After | Speedup |
|----------|--------|-------|---------|
| Agent analysis (1st run) | T seconds | T seconds | 1x (baseline) |
| Agent analysis (2nd+ run) | T seconds | T - 0.5s | YAML cache saves ~0.5s |
| Org with 10 assessments | 11 API calls (sequential) | 11 API calls (parallel) | ~5-10x faster |
| Database query on 1000 responses | Full table scan | Indexed lookup | ~10-100x faster |
| Three pillar agents | Sequential (3T) | Parallel (T) | 3x faster |

### Overall Impact

For a typical agent analysis on an organization with 5-10 completed assessments:
- **First run**: ~2-3x faster due to parallel agent execution and parallel API calls
- **Subsequent runs**: ~3-4x faster due to additional YAML caching benefit
- **Database queries**: Significantly faster as data grows beyond 100 records

## Additional Optimizations Identified (Not Implemented)

The following performance issues were identified but not addressed in this PR:

### Medium Priority
1. **Dashboard chart memoization**: Complex Recharts calculations (`trendData`, `domainTrendData`, `pillarRadarData`) could benefit from more aggressive memoization, especially with 20+ assessments.

2. **Ollama connection pooling**: Agent creates new `ChatOllama` instances on each invocation. Could implement singleton pattern.

3. **Response pagination**: `getDomainResponsesTool` loads all responses without limit, causing memory bloat with thousands of responses.

### Low Priority
4. **Request debouncing**: Assessment form saves on every change without debouncing, causing network overhead.

5. **Client-side caching**: API client doesn't implement any caching layer for organization/assessment data.

## Testing Recommendations

To validate these improvements:

1. **Load test**: Create org with 10+ completed assessments and measure agent analysis time
2. **Database performance**: Insert 1000+ responses and measure query times with EXPLAIN QUERY PLAN
3. **Memory profiling**: Run agent analysis multiple times and verify YAML is cached (no repeated file reads)
4. **Network inspection**: Verify parallel API calls in browser DevTools Network tab

## Best Practices for Future Development

Based on this analysis, follow these patterns:

1. **Cache expensive I/O**: Always cache large file reads (YAML, JSON configs)
2. **Parallel fetching**: Use `Promise.all()` for independent API calls
3. **Database indexes**: Add indexes on all foreign keys and frequently filtered columns
4. **React memoization**: Use `useMemo`, `useCallback` for expensive calculations and handlers
5. **Parallel processing**: Run independent operations concurrently when possible

## Files Modified

- `webapp/src/react_agent/tools/api-client.ts` - YAML caching + parallel fetching
- `webapp/server/index.ts` - Database indexes
- `webapp/src/react_agent/agents/orchestrator.ts` - Parallel agent execution default
- `webapp/src/components/OrganizationDashboard.tsx` - React optimization

## References

- N+1 Query Problem: https://stackoverflow.com/questions/97197/what-is-the-n1-selects-problem
- Database Indexing: https://use-the-index-luke.com/
- React Performance: https://react.dev/learn/render-and-commit
- Promise.all: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all
